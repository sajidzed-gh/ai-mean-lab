import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

type JSONRPCRequest<T = any> = {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params?: T;
};

type JSONRPCResponse<T = any> = {
  jsonrpc: '2.0';
  id: number;
  result?: T;
  error?: any;
};

class MCPClient {
  private process: ChildProcessWithoutNullStreams;
  private buffer = '';
  private requestId = 1;
  private pending = new Map<number, (res: JSONRPCResponse) => void>();
  private initialized = false;

  constructor(command: string, args: string[]) {
    this.process = spawn(command, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    this.process.stdout.on('data', (data) => this.handleData(data));
    this.process.stderr.on('data', (data) =>
      console.error('SERVER ERROR1:', data.toString()),
    );

    this.process.on('spawn', () => {
      console.log('MCP Server process started with PID:', this.process.pid);
      this.runInitialFlow();
    });

    this.process.on('exit', (code) => {
      console.log('Server exited with code:', code);
    });
  }

  private handleData(data: Buffer) {
    console.log('in handleData:', data.toString());
    this.buffer += data.toString();

    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        //console.log("Received line before parsing:", line);
        const msg: JSONRPCResponse = JSON.parse(line);
        this.handleMessage(msg);
      } catch (err) {
        console.error('Failed to parse:', line, 'Error:', err);
      }
    }
  }

  private handleMessage(msg: JSONRPCResponse) {
    // Resolve pending request
    if (msg.id && this.pending.has(msg.id)) {
      const resolver = this.pending.get(msg.id)!;
      this.pending.delete(msg.id);
      resolver(msg);
    }

    // First-time initialization trigger
    if (!this.initialized) {
      this.initialized = true;
      this.runInitialFlow();
    }
  }

  private send(method: string, params?: any): Promise<any> {
    const id = this.requestId++;

    const request: JSONRPCRequest = {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };

    return new Promise((resolve, reject) => {
      this.pending.set(id, (response: JSONRPCResponse) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.result);
        }
      });

      this.process.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  // 🚀 Initial flow: list tools → call one
  private async runInitialFlow() {
    try {
      console.log('\n📡 Fetching tools...\n');

      const tools = await this.send('tools/list');
      console.log('✅ Available tools:\n', JSON.stringify(tools, null, 2));

      if (!tools?.tools?.length) {
        console.log('No tools available.');
        return;
      }

      const toolName = tools.tools[1].name;

      console.log(`\n🛠️ Calling tool: ${toolName}\n`);

      const result = await this.send('tools/call', {
        name: toolName,
        arguments: {
          a: 500,
          b: 7,
        },
      });

      console.log('✅ Tool result:\n', JSON.stringify(result, null, 2));
    } catch (err) {
      console.error('❌ Error:', err);
    }
  }
}

// 👉 Update this path to your compiled MCP server entry
const SERVER_PATH = './dist/ModelContextProtocol/mcpServer.js';
//const SERVER_PATH = "src/ModelContextProtocol/mcpServer.ts";

// Start client
new MCPClient('node', [SERVER_PATH]);

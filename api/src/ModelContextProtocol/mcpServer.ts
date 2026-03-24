import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

//create Server
const server = new McpServer({
  name: 'demo-mcp-server',
  version: '0.1.0',
});

//Tool 1 : get current server Time
server.registerTool(
  'getTime',
  {
    description: 'Get the current server time',
    inputSchema: z.object({}),
  },
  async () => {
    return {
      content: [
        {
          type: 'text',
          text: `Current server time is: ${new Date().toISOString()}`,
        },
      ],
    };
  },
);

//tool 2 : Add numbers
server.registerTool(
  'addNumbers',
  {
    description: 'Add two numbers',
    inputSchema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: 'text',
          text: `Result : ${a + b}`,
        },
      ],
    };
  },
);

async function startServer() {
  // Start the server with a stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server is running...');
}

startServer().catch((err) => {
  console.error('Error starting MCP Server:', err);
  process.exit(1);
});

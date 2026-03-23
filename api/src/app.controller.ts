import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import express from 'express';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * postman request POST 'http://localhost:3000/app/webhook' \
  --header 'Content-Type: application/json' \
  --body '{
    "event" : {
        "type" : "payment.succeeded1",
        "data" : {
            "banId": "xyz",
            "bankName" : "Bofa"
        }
    }
	
}'
  **/

  @Post('/webhook')
  async FirstWebhook(
    @Req() request: express.Request,
    @Res() res: express.Response,
  ) {
    const whatMakesAPIaWebhook: string =
      'It is an HTTP endpoint that can receive POST requests from external services (like payment gateways) when specific events occur. \n And the endpoint is registered with the external service to receive notifications about those events. \n It processes the incoming data and performs actions based on the event type, such as updating records, sending notifications, or triggering other workflows. \n It responds to the sender (external service) to acknowledge receipt of the webhook, often with a status code like 200 OK. \n It is designed to be secure, often by validating the source of the webhook or using secret tokens to ensure that the requests are legitimate.';
    console.log('What makes an API a Webhook? ', whatMakesAPIaWebhook);
    const event = request.body.event; // Webhook event data

    console.log('Received webhook event:', event);
    switch (event.type) {
      case 'payment.succeeded':
        // Handle successful payment intent
        console.log('Payment succeeded:', event.data);
        break;
      case 'payment.failed':
        // Handle failed payment intent
        console.log('Payment failed:', event.data);
        break;
      default:
        console.log('Unhandled event type:');
    }
    res.status(200).send('Webhook received'); // Respond to acknowledge receipt of the webhook
  }
}

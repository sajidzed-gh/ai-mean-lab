import { Component } from "@angular/core";

@Component({
    selector: 'app-message',
    templateUrl: './message.html',
    styleUrl: './message.scss'
})
export class Message {
    name: string = "Hello Welcome GROQ";
}

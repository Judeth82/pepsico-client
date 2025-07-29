export class SendEmailRequestModel {
    to!: string;
    subject!: string;
    plainMessage?: string;
    htmlMessage?: string;
}

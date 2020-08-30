import IMailProvider from "../models/IMailProvider";
import ISendDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendDTO[] = [];

  public async sendMail(message: ISendDTO): Promise<void> {
    this.messages.push(message);
  }
}

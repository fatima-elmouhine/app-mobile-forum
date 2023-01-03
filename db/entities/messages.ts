export class messages
{
	private _id_message: number;
	public get id_message(): number
	{
		return this._id_message;
	}
	public set id_message(val: number)
	{
		this._id_message = val;
	}

	private _text_message: string;
	public get text_message(): string
	{
		return this._text_message;
	}
	public set text_message(val: string)
	{
		this._text_message = val;
	}

	private _id_topic: number;
	public get id_topic(): number
	{
		return this._id_topic;
	}
	public set id_topic(val: number)
	{
		this._id_topic = val;
	}

	private _id_user: number;
	public get id_user(): number
	{
		return this._id_user;
	}
	public set id_user(val: number)
	{
		this._id_user = val;
	}


	constructor (id_message_: number,text_message_: string,id_topic_: number,id_user_: number)
	{
		this.id_message = id_message_;
		this.text_message = text_message_;
		this.id_topic = id_topic_;
		this.id_user = id_user_;
	}
}
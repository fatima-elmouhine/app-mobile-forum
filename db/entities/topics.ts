export class topics
{
	private _id_topic: number;
	public get id_topic(): number
	{
		return this._id_topic;
	}
	public set id_topic(val: number)
	{
		this._id_topic = val;
	}

	private _title_topic: string;
	public get title_topic(): string
	{
		return this._title_topic;
	}
	public set title_topic(val: string)
	{
		this._title_topic = val;
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


	constructor (id_topic_: number,title_topic_: string,id_user_: number)
	{
		this.id_topic = id_topic_;
		this.title_topic = title_topic_;
		this.id_user = id_user_;
	}
}
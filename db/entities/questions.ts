export class questions
{
	private _id_question: number;
	public get id_question(): number
	{
		return this._id_question;
	}
	public set id_question(val: number)
	{
		this._id_question = val;
	}

	private _text_question: string;
	public get text_question(): string
	{
		return this._text_question;
	}
	public set text_question(val: string)
	{
		this._text_question = val;
	}

	private _id_theme: number;
	public get id_theme(): number
	{
		return this._id_theme;
	}
	public set id_theme(val: number)
	{
		this._id_theme = val;
	}


	constructor (id_question_: number,text_question_: string,id_theme_: number)
	{
		this.id_question = id_question_;
		this.text_question = text_question_;
		this.id_theme = id_theme_;
	}
}
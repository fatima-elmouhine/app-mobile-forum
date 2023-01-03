export class answers
{
	private _id_answer: number;
	public get id_answer(): number
	{
		return this._id_answer;
	}
	public set id_answer(val: number)
	{
		this._id_answer = val;
	}

	private _text_answer: string;
	public get text_answer(): string
	{
		return this._text_answer;
	}
	public set text_answer(val: string)
	{
		this._text_answer = val;
	}

	private _isCorrect_answer: boolean;
	public get isCorrect_answer(): boolean
	{
		return this._isCorrect_answer;
	}
	public set isCorrect_answer(val: boolean)
	{
		this._isCorrect_answer = val;
	}


	constructor (id_answer_: number,text_answer_: string,isCorrect_answer_: boolean)
	{
		this.id_answer = id_answer_;
		this.text_answer = text_answer_;
		this.isCorrect_answer = isCorrect_answer_;
	}
}
export class questions_answers
{
	private _id_question_answer: number;
	public get id_question_answer(): number
	{
		return this._id_question_answer;
	}
	public set id_question_answer(val: number)
	{
		this._id_question_answer = val;
	}

	private _id_question: number;
	public get id_question(): number
	{
		return this._id_question;
	}
	public set id_question(val: number)
	{
		this._id_question = val;
	}

	private _id_answer: number;
	public get id_answer(): number
	{
		return this._id_answer;
	}
	public set id_answer(val: number)
	{
		this._id_answer = val;
	}


	constructor (id_question_answer_: number,id_question_: number,id_answer_: number)
	{
		this.id_question_answer = id_question_answer_;
		this.id_question = id_question_;
		this.id_answer = id_answer_;
	}
}
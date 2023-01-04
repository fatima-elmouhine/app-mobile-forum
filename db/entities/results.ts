export class results
{
	private _id_result: number;
	public get id_result(): number
	{
		return this._id_result;
	}
	public set id_result(val: number)
	{
		this._id_result = val;
	}

	private _result_result: number;
	public get result_result(): number
	{
		return this._result_result;
	}
	public set result_result(val: number)
	{
		this._result_result = val;
	}

	private _answers_qcm_result: string;
	public get answers_qcm_result(): string
	{
		return this._answers_qcm_result;
	}
	public set answers_qcm_result(val: string)
	{
		this._answers_qcm_result = val;
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

	private _id_user: number;
	public get id_user(): number
	{
		return this._id_user;
	}
	public set id_user(val: number)
	{
		this._id_user = val;
	}

	private _id_user_qcm: number;
	public get id_user_qcm(): number
	{
		return this._id_user_qcm;
	}
	public set id_user_qcm(val: number)
	{
		this._id_user_qcm = val;
	}


	constructor (id_result_: number,result_result_: number,answers_qcm_result_: string,id_question_: number,id_user_: number,id_user_qcm_: number)
	{
		this.id_result = id_result_;
		this.result_result = result_result_;
		this.answers_qcm_result = answers_qcm_result_;
		this.id_question = id_question_;
		this.id_user = id_user_;
		this.id_user_qcm = id_user_qcm_;
	}
}
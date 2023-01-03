export class qcms_questions
{
	private _id_qcm_question: number;
	public get id_qcm_question(): number
	{
		return this._id_qcm_question;
	}
	public set id_qcm_question(val: number)
	{
		this._id_qcm_question = val;
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

	private _id_qcm: number;
	public get id_qcm(): number
	{
		return this._id_qcm;
	}
	public set id_qcm(val: number)
	{
		this._id_qcm = val;
	}


	constructor (id_qcm_question_: number,id_question_: number,id_qcm_: number)
	{
		this.id_qcm_question = id_qcm_question_;
		this.id_question = id_question_;
		this.id_qcm = id_qcm_;
	}
}
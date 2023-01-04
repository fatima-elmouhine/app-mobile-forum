export class users_qcms
{
	private _id_user_qcm: number;
	public get id_user_qcm(): number
	{
		return this._id_user_qcm;
	}
	public set id_user_qcm(val: number)
	{
		this._id_user_qcm = val;
	}

	private _structure_qcm_result: string;
	public get structure_qcm_result(): string
	{
		return this._structure_qcm_result;
	}
	public set structure_qcm_result(val: string)
	{
		this._structure_qcm_result = val;
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

	private _id_qcm: number;
	public get id_qcm(): number
	{
		return this._id_qcm;
	}
	public set id_qcm(val: number)
	{
		this._id_qcm = val;
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


	constructor (id_user_qcm_: number,structure_qcm_result_: string,answers_qcm_result_: string,id_qcm_: number,id_user_: number)
	{
		this.id_user_qcm = id_user_qcm_;
		this.structure_qcm_result = structure_qcm_result_;
		this.answers_qcm_result = answers_qcm_result_;
		this.id_qcm = id_qcm_;
		this.id_user = id_user_;
	}
}
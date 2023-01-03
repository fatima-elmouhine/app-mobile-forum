export class qcms
{
	private _id_qcm: number;
	public get id_qcm(): number
	{
		return this._id_qcm;
	}
	public set id_qcm(val: number)
	{
		this._id_qcm = val;
	}

	private _title_qcm: string;
	public get title_qcm(): string
	{
		return this._title_qcm;
	}
	public set title_qcm(val: string)
	{
		this._title_qcm = val;
	}

	private _isGenerated_qcm: boolean;
	public get isGenerated_qcm(): boolean
	{
		return this._isGenerated_qcm;
	}
	public set isGenerated_qcm(val: boolean)
	{
		this._isGenerated_qcm = val;
	}

	private _id_type: number;
	public get id_type(): number
	{
		return this._id_type;
	}
	public set id_type(val: number)
	{
		this._id_type = val;
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


	constructor (id_qcm_: number,title_qcm_: string,isGenerated_qcm_: boolean,id_type_: number,id_user_: number)
	{
		this.id_qcm = id_qcm_;
		this.title_qcm = title_qcm_;
		this.isGenerated_qcm = isGenerated_qcm_;
		this.id_type = id_type_;
		this.id_user = id_user_;
	}
}
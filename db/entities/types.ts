export class types
{
	private _id_type: number;
	public get id_type(): number
	{
		return this._id_type;
	}
	public set id_type(val: number)
	{
		this._id_type = val;
	}

	private _type_type: string;
	public get type_type(): string
	{
		return this._type_type;
	}
	public set type_type(val: string)
	{
		this._type_type = val;
	}


	constructor (id_type_: number,type_type_: string)
	{
		this.id_type = id_type_;
		this.type_type = type_type_;
	}
}
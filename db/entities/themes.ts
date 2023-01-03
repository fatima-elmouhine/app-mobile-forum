export class themes
{
	private _id_theme: number;
	public get id_theme(): number
	{
		return this._id_theme;
	}
	public set id_theme(val: number)
	{
		this._id_theme = val;
	}

	private _title_theme: string;
	public get title_theme(): string
	{
		return this._title_theme;
	}
	public set title_theme(val: string)
	{
		this._title_theme = val;
	}

	private _description_theme: string;
	public get description_theme(): string
	{
		return this._description_theme;
	}
	public set description_theme(val: string)
	{
		this._description_theme = val;
	}


	constructor (id_theme_: number,title_theme_: string,description_theme_: string)
	{
		this.id_theme = id_theme_;
		this.title_theme = title_theme_;
		this.description_theme = description_theme_;
	}
}
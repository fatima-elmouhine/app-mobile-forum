export class courses
{
	private _id_course: number;
	public get id_course(): number
	{
		return this._id_course;
	}
	public set id_course(val: number)
	{
		this._id_course = val;
	}

	private _link_course: string;
	public get link_course(): string
	{
		return this._link_course;
	}
	public set link_course(val: string)
	{
		this._link_course = val;
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


	constructor (id_course_: number,link_course_: string,id_theme_: number)
	{
		this.id_course = id_course_;
		this.link_course = link_course_;
		this.id_theme = id_theme_;
	}
}
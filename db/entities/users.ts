export class users
{
	private _id_user: number;
	public get id_user(): number
	{
		return this._id_user;
	}
	public set id_user(val: number)
	{
		this._id_user = val;
	}

	private _email_user: string;
	public get email_user(): string
	{
		return this._email_user;
	}
	public set email_user(val: string)
	{
		this._email_user = val;
	}

	private _firstname_user: string;
	public get firstname_user(): string
	{
		return this._firstname_user;
	}
	public set firstname_user(val: string)
	{
		this._firstname_user = val;
	}

	private _lastname_user: string;
	public get lastname_user(): string
	{
		return this._lastname_user;
	}
	public set lastname_user(val: string)
	{
		this._lastname_user = val;
	}

	private _password_user: string;
	public get password_user(): string
	{
		return this._password_user;
	}
	public set password_user(val: string)
	{
		this._password_user = val;
	}


	constructor (id_user_: number,email_user_: string,firstname_user_: string,lastname_user_: string,password_user_: string)
	{
		this.id_user = id_user_;
		this.email_user = email_user_;
		this.firstname_user = firstname_user_;
		this.lastname_user = lastname_user_;
		this.password_user = password_user_;
	}
}


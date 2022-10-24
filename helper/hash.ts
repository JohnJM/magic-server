import bcrypt from "bcrypt";

const hash = async (pwd: string) => bcrypt.hash(pwd, await bcrypt.genSalt());

export { hash };

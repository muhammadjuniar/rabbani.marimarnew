import utf8 from 'utf8'
import session from "@/config/session";

const baseUrl = '';
const baseApi = utf8.decode('\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x31\x69\x74\x6d\x65\x64\x69\x61\x2e\x63\x6f\x2e\x69\x64');
const secretStatic = '';
const secretUser = (session.getters.stateUser && session.getters.stateUser.secret) ? session.getters.stateUser.secret : secretStatic;

export { baseUrl, baseApi, secretStatic, secretUser }
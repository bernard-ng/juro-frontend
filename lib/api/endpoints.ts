const BASE_URL = "http://api.juro.cd/api";

const Endpoints = {
    me: `${BASE_URL}/me`,
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
    chats: `${BASE_URL}/chats`,
    chat: `${BASE_URL}/chat`,
    messages: `${BASE_URL}/messages`,
    suggestedPrompts: `${BASE_URL}/suggested_prompts`,
}

export default Endpoints;

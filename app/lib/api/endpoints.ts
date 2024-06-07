const BASE_URL: string = process.env.API_URL || 'https://api.juro.life/api'

/**
 * API endpoints
 *
 * For more information
 * @see http://api.juro.cd/api/doc.html
 */
const Endpoints = {
    me: `${BASE_URL}/me`,
    login: `${BASE_URL}/login_check`,
    register: `${BASE_URL}/register`,
    chats: `${BASE_URL}/chats`,
    chat: `${BASE_URL}/chat`,
    messages: `${BASE_URL}/chats/{chatId}/messages`,
    suggestedPrompts: `${BASE_URL}/suggested_prompts`,
}

export default Endpoints

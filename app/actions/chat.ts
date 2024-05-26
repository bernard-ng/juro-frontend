'use server'
import {fetchApi, getRequestHeaders} from "@lib/api/api";
import { cookies } from 'next/headers'

const token = cookies().get('token')?.value
const headers = getRequestHeaders(token as string)

export async function createChat() {
}

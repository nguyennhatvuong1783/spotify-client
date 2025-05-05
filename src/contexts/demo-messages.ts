import { Message } from "@/types/user";

export const demoMessages: Record<string, Message[]> = {
    "1": [
        {
            id: "1",
            senderId: "1",
            text: "Chào bạn, hôm nay bạn khỏe không?",
            timestamp: "2023-05-01T10:30:00Z",
        },
        {
            id: "2",
            senderId: "me",
            text: "Chào bạn, tôi khỏe. Còn bạn thì sao?",
            timestamp: "2023-05-01T10:32:00Z",
        },
        {
            id: "3",
            senderId: "1",
            text: "Tôi cũng khỏe, cảm ơn bạn đã hỏi thăm!",
            timestamp: "2023-05-01T10:33:00Z",
        },
    ],
    "2": [
        {
            id: "1",
            senderId: "2",
            text: "Bạn đã hoàn thành dự án chưa?",
            timestamp: "2023-05-01T09:15:00Z",
        },
        {
            id: "2",
            senderId: "me",
            text: "Tôi đang làm và sẽ hoàn thành vào ngày mai.",
            timestamp: "2023-05-01T09:17:00Z",
        },
        {
            id: "3",
            senderId: "2",
            text: "Tốt lắm, hãy cập nhật cho tôi khi bạn hoàn thành nhé.",
            timestamp: "2023-05-01T09:18:00Z",
        },
    ],
    "3": [
        {
            id: "1",
            senderId: "3",
            text: "Hẹn gặp lại vào ngày mai nhé!",
            timestamp: "2023-05-01T08:00:00Z",
        },
        {
            id: "2",
            senderId: "me",
            text: "Được rồi, hẹn gặp lại bạn vào ngày mai.",
            timestamp: "2023-05-01T08:01:00Z",
        },
    ],
    "4": [
        {
            id: "1",
            senderId: "me",
            text: "Cảm ơn bạn đã giúp đỡ tôi hôm nay.",
            timestamp: "2023-05-01T07:45:00Z",
        },
        {
            id: "2",
            senderId: "4",
            text: "Cảm ơn bạn rất nhiều!",
            timestamp: "2023-05-01T07:46:00Z",
        },
    ],
    "5": [
        {
            id: "1",
            senderId: "5",
            text: "Tôi sẽ gửi tài liệu cho bạn sớm.",
            timestamp: "2023-04-30T16:20:00Z",
        },
        {
            id: "2",
            senderId: "me",
            text: "Cảm ơn bạn, tôi đang cần tài liệu đó.",
            timestamp: "2023-04-30T16:22:00Z",
        },
        {
            id: "3",
            senderId: "5",
            text: "Không có gì, tôi sẽ gửi trong hôm nay.",
            timestamp: "2023-04-30T16:23:00Z",
        },
    ],
    "6": [
        {
            id: "1",
            senderId: "5",
            text: "Tôi sẽ gửi tài liệu cho bạn sớm.",
            timestamp: "2023-04-30T16:20:00Z",
        },
        {
            id: "2",
            senderId: "me",
            text: "Cảm ơn bạn, tôi đang cần tài liệu đó.",
            timestamp: "2023-04-30T16:22:00Z",
        },
        {
            id: "3",
            senderId: "5",
            text: "Không có gì, tôi sẽ gửi trong hôm nay.",
            timestamp: "2023-04-30T16:23:00Z",
        },
    ],
};

"use client";

import { User } from "@/types/user";

// Parse Excel file and return array of users
export async function parseExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // reader.onload = (e) => {
        //     try {
        //         const data = e.target?.result;
        //         const workbook = XLSX.read(data, { type: "binary" });
        //         const sheetName = workbook.SheetNames[0];
        //         const worksheet = workbook.Sheets[sheetName];
        //         const jsonData = XLSX.utils.sheet_to_json(worksheet);

        //         // Map Excel data to User objects
        //         const users: User[] = jsonData.map((row: any, index) => ({
        //             id: (index + 1).toString(), // Generate new IDs
        //             username: row.username || "",
        //             email: row.email || "",
        //             phone: row.phone || "",
        //             accountType: (row.accountType || "user") as
        //                 | "admin"
        //                 | "user"
        //                 | "guest",
        //             isActive: row.isActive === "true" || row.isActive === true,
        //         }));

        //         resolve(users);
        //     } catch (error) {
        //         reject(error);
        //     }
        // };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsBinaryString(file);
    });
}

// Export users to Excel file
export function exportToExcel(users: any[], fileName: string) {
    // Create worksheet
    // const worksheet = XLSX.utils.json_to_sheet(users);
    // Create workbook
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    // Generate Excel file and trigger download
    // XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

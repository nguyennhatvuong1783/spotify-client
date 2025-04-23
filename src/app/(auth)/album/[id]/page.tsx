import AlbumTitle from "@/components/AlbumTitle/AlbumTitle";
import ListSongs from "@/components/ListSongs/ListSongs";

export default async function Album({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    console.log(id);

    return (
        <>
            <AlbumTitle />
            <ListSongs />
        </>
    );
}

import { ClipType } from "./types";

type Props = {
    clip: ClipType;
};
const ClipItem = ({ clip }: Props) => {
    return (
        <div>{clip.content}</div>
    );
};

export default ClipItem;
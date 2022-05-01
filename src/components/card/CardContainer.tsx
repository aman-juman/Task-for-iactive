import {FC, useEffect} from "react";
import {messageApi} from "../../redux/services/message";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../redux/store/store";
import {putMessages} from "../../redux/features/messageSlice";
import Card from "./Card";


const CardContainer: FC = () => {
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    formData.append('messageId', '0');
    const [fetchMessages, {isSuccess}] = messageApi.useFetchAllMessagesMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleFetchMessages = async () => {
            let response = await fetchMessages(formData).unwrap();
            await dispatch(putMessages(response.Messages))
        };
        handleFetchMessages();
    }, []);


    const messages = useTypedSelector(state => state.messages);
    return (
        <div>
            {isSuccess &&
                messages.messages.map((item, i) =>(
                   <div key={i}>
                       <Card message={item} />
                   </div>
                ))
            }
        </div>
    )
};

export default CardContainer;
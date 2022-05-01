import {FC, useEffect, useState} from "react";
import styles from "../../styles/Card.module.scss";
import userIcon from "../../assets/images/user.svg";
import {ReactComponent as ArrowIcon} from "../../assets/images/arrow.svg";
import {ReactComponent as FileIcon} from "../../assets/images/file.svg";
import {ReactComponent as SettingIcon} from "../../assets/images/setting.svg";
import {ReactComponent as StarIcon} from "../../assets/images/star.svg";
import cn from "classnames";
import {IPropsMessage, TypesAttach} from "../../types/types";


const Card: FC<IPropsMessage> = ({message}) => {
    const {author, content, attachments, date} = message;
    const time = new Date(date);
    const [star, setStar] = useState(false);

    useEffect(() => {
        // @ts-ignore
        let storedArray = JSON.parse(localStorage.getItem("star"));
        if (storedArray === null) {
            storedArray = [];
        }
        setStar(!!storedArray.find((item: string) => item == message.id))
    }, [star]);
    const handleStar = () => {
        // @ts-ignore
        let storedArray = JSON.parse(localStorage.getItem("star"));
        if (storedArray === null) {
            storedArray = [];
        }
        if(!!storedArray.find((i: string)=> i == message.id)){
            storedArray = storedArray.filter((i:string) => i !== message.id);
            localStorage.setItem("star", JSON.stringify(storedArray));
            setStar(false)
        } else{
            storedArray.push(message.id);
            localStorage.setItem("star", JSON.stringify(storedArray));
            setStar(true)
        }

        // }

    };
    return (
        <div className={styles.wrap}>
            <div className={styles.row}>
                <div className={styles.user}>
                    <img src={userIcon} alt="user"/>
                    <div>{time.getHours()}:{time.getMinutes()}</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.topContent}>
                        <div className={styles.author}>
                            <h3>{author}-----{message.id}</h3>
                            <p>Текст поста в соц. сетях если это комментарий</p>
                        </div>
                        <div className={styles.buttonsWrap}>
                            <div className={styles.directionBtnWrap}>
                                <button className={styles.directionBtn}>Левый</button>
                                <button className={styles.directionBtn}>Центр</button>
                                <button className={styles.directionBtn}>Правый</button>
                            </div>
                            <div className={styles.settingWrap}>
                                <ArrowIcon className={styles.settingBtn}/>
                                <FileIcon className={styles.settingBtnStroke}/>
                                <SettingIcon className={styles.settingBtn}/>
                                <StarIcon
                                    onClick={() => handleStar()}
                                    className={cn(styles.settingBtn, { [styles.active]: star }
                                    )}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.text}>
                        {content}
                        <div className={styles.next}>Далее</div>
                    </div>
                    {
                        attachments && attachments.length > 0
                            ? attachments[0].type === TypesAttach.Image
                            ? <img className={styles.image} src={attachments[0].url} alt="image"/>
                            : <video className={styles.image} controls>
                                <source src={attachments && attachments[0].url} type="video/mp4"/>
                            </video>
                            : null
                    }
                </div>
            </div>

            <div className={styles.tags}>
                <div className={cn(styles.tag, {[styles.active]: true})}>#Новое</div>
                <div className={cn(styles.tag, {[styles.active]: false})}>#Эксперт</div>
            </div>
        </div>
    )
};


export default Card;
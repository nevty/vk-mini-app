import React from 'react';
import PropTypes from 'prop-types';
import {
	Header,
    PanelHeaderContent,
    PanelHeader,
    Panel,
    Group,
    Cell,
	CellButton,
    Avatar,
    InfoRow,
} from "@vkontakte/vkui"
import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline"
import bridge from '@vkontakte/vk-bridge';

const Home = ({ id, fetchedUser }) => {
    const fetchFriendList = () => {
        bridge.send("VKWebAppGetFriends")
    }
    const defineSex = (n) => {
        if (n === 1) return "Женский";
        if (n === 2) return "Мужской";
        if (n === 0) return "Не указан";
    }
    return (
        <Panel id={id}>
            <PanelHeader>
                {
                    fetchedUser && <PanelHeaderContent
                        before={<Avatar src={fetchedUser.photo_200}/>}>
                        {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                    </PanelHeaderContent>
                }
            </PanelHeader>
            <Group header={<Header mode="secondary">Информация о пользователе</Header>}>
				<Cell>
					<InfoRow header="Дата рождения">
						{
							(fetchedUser && fetchedUser.bdate) || "Не указана"
						}
					</InfoRow>
				</Cell>
                <Cell>
                    <InfoRow header="Пол">
                        {
                            fetchedUser && fetchedUser.sex && defineSex(fetchedUser.sex)
                        }
                    </InfoRow>
                </Cell>
				<Cell>
					<InfoRow header="Город">
						{
							(fetchedUser && fetchedUser.city && fetchedUser.city.title) || "Не указан"
						}
					</InfoRow>
				</Cell>
            </Group>
            <Group header={<Header mode="secondary">Кнопки</Header>}>
                <CellButton before={<Icon28UserOutline/>} onClick={fetchFriendList}>
                    Друзья
                </CellButton>
            </Group>
        </Panel>
    );
}

Home.propTypes = {
    id: PropTypes.string.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        sex: PropTypes.number,
        city: PropTypes.shape({
            title: PropTypes.string,
        }),
    }),
};

export default Home;

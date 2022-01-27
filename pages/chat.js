import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    const [chatmsg, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
    function handleNovaMensagem(novaMensagem) {
        const chatmsg = {
            id: listaDeMensagens.length + 1,
            de: 'kauelima',
            texto: novaMensagem,
        };

        setListaDeMensagens([
            chatmsg,
            ...listaDeMensagens,
        ]);
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: appConfig.theme.colors.light['primaryOverlay']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundImage: `url(https://kauelima.com/img/stones.jpg)`,
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.light['white'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((chatmsgAtual) => {
                        return (
                            <li key={chatmsAtual.id}>
                                {chatmsgAtual.de}: {chatmsgAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                                    styleSheet={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/kauelima.png`}
                        />
                        <TextField
                            value={chatmsg}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter' && chatmsg.trim().length > 0 && event.shiftKey == false){
                                    event.preventDefault();
                                    handleNovaMensagem(chatmsg);
                                }
                            }}
                            placeholder="Digite sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '10px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.light['gray4'],
                                marginRight: '12px',
                                color: appConfig.theme.colors.light['black'],
                            }}
                        />
                        <Button
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.light['primaryOverlay'],
                                mainColor: appConfig.theme.colors.light['primary'],
                                mainColorStrong: appConfig.theme.colors.light['primary']
                            }}
                            onClick={() => {
                                if (chatmsg.trim().length > 0){
                                    handleNovaMensagem(chatmsg);
                                }
                            }}
                            rounded="full"
                            variant="secondary"
                            label="Enviar mensagem"
                            styleSheet={{
                                height: '50px',
                                margin: '0'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    rounded="full"
                    styleSheet={{
                        color: appConfig.theme.colors.light['white'],
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.light['gray1'],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((chatmsg) => {
                return (
                    <Text
                        key={chatmsg.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.light['gray4'],
                            }
                        }}
                    >
                        {/* Message */}
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'nowrap',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                {/* Profile picture */}
                                <Image
                                    styleSheet={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/kauelima.png`}
                                />
                                {/* User */}
                                <Text tag="strong">
                                    {chatmsg.de}
                                </Text>
                                {/* Datetime */}
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.light['gray2'],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            {/* Delete Message Button */}
                            {/* <Box>
                                <Button
                                    iconName="FaTimes"
                                    variant="tertiary"
                                    colorVariant='neutral'
                                
                                    onClick={(event) => {
                                        console.log(event);
                                    }}
                                />
                            </Box> */}
                        </Box>
                        {chatmsg.texto}
                    </Text>
                );
            })}
        </Box>
    )
}
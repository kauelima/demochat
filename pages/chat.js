
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'



const supabase_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL 
const supabaseClient = createClient(supabase_url, supabase_anon_key)


export default function ChatPage() {
    const [chatmsg, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    console.log( 'Anon Key: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY );
    console.log( 'URL: ' + process.env.NEXT_PUBLIC_SUPABASE_URL )

    const router = useRouter();
    const { username } = router.query;

    React.useEffect(() => {
        supabaseClient
            .from('chatMessages')
            .select('*')
            .order('created_at', {ascending: false})
            .then(({data}) => {
                setListaDeMensagens(data)
            });
    }, []);

  

    function handleNovaMensagem(novaMensagem) {
        const chatmsg = {
            usr: username,
            text: novaMensagem,
        };
        supabaseClient
            .from('chatMessages')
            .insert([chatmsg])
            .then((res) => {
                setListaDeMensagens([
                res.data[0],
                ...listaDeMensagens,
                ]);
            });

        
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
                    <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Image
                                    styleSheet={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${username}.png`}
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
                            type="text"
                            styleSheet={{
                                width: '100%',

                                height: '50px',
                                border: '0',
                                resize: 'none',
                                borderRadius: '50px',
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
                            variant="primary"
                            label="Enviar"
                            styleSheet={{
                                height: '50px',
                                margin: '0',
                                paddingHorizontal: '30px'
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
    const router = useRouter();
    const { username } = router.query;

    async function handleDeleteMessage(msgId){
        await supabaseClient
            .from('chatMessages')
            .delete()
            .match({ id: msgId })

        let novaLista = props.mensagens.filter((message)=>{
            if(message.id != msgId){
                return message
            }
        })

        props.setListaDeMensagens([
            ...novaLista
        ])
    }

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
                                    src={`https://github.com/${chatmsg.usr}.png`}
                                />
                                {/* User */}
                                <Text tag="strong">
                                    {chatmsg.usr}
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
                                   
                                   {chatmsg.created_at}                            
                                </Text>
                            </Box>
                            {/* Delete Message Button */}
                            <Box>
                                <Button
                                    iconName="FaTimes"
                                    variant="tertiary"
                                    colorVariant='neutral'
                                
                                    onClick={() => handleDeleteMessage(chatmsg.id)}
                                />
                            </Box>
                        </Box>
                        {chatmsg.text}
                    </Text>
                );
            })}
        </Box>
    )
}
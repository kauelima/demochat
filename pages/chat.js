import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/buttonSendSticker'
import moment from 'moment'
import Moment from 'react-moment'



const supabase_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseClient = createClient(supabase_url, supabase_anon_key)



function remoteMessagesListener(remoteMsg) {
    return supabaseClient
        .from('chatMessages')
        .on('*', (response) => {
            if(response.eventType==='INSERT'){
                remoteMsg('INSERT',response.new)
            }
            else if(response.eventType==='DELETE'){
                remoteMsg('DELETE',response.old)
            }
            else if(response.eventType==='UPDATE'){
                remoteMsg('UPDATE',response.new)
            }
        })
        .subscribe();  
}


export default function ChatPage() {
    const [chatmsg, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    const router = useRouter();
    const loggedUsername = router.query.username;

    function kickNoUsername(){
        {loggedUsername
            ? (
                console.log('Valid username', loggedUsername)
            )
            : (
                console.log('Invalid username', loggedUsername),
                router.push('../')
            )
        
        }
    }

    React.useEffect(() => {
        supabaseClient
            .from('chatMessages')
            .select('*')
            .order('created_at', {ascending: false})
            .then(({data}) => {
                setListaDeMensagens(data)
            });

            remoteMessagesListener((eventType, remoteMsg) => {
                if(eventType==='INSERT'){
                    setListaDeMensagens((currentMsgList)=>{
                        return[remoteMsg,...currentMsgList];
                    })
                }
                else if(eventType==='DELETE'){
                    setListaDeMensagens((currentMsgList)=>{
                        return (
                            currentMsgList.filter((msgAtual)=>{
                                return msgAtual.id !== remoteMsg.id
                            })
                        )
                    })
                }
                else if(eventType==='UPDATE'){
                    setListaDeMensagens((currentMsgList)=>{
                        return(
                            currentMsgList.map((editMsg)=>{
                                if(editMsg.id===remoteMsg.id){
                                    editMsg.text = remoteMsg.text;
                                    return editMsg;
                                }
                                else{
                                    return editMsg;
                                }
                            })
                        )
                    })
                }
            });
        kickNoUsername()
    }, []);

  

    function handleNovaMensagem(novaMensagem) {
        const chatmsg = {
            usr: loggedUsername,
            text: novaMensagem,
        };
        supabaseClient
            .from('chatMessages')
            .insert([chatmsg])
            .then((res) => {
            });
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                color: appConfig.theme.colors.light['black']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.light['gray4'],
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100vh',
                    padding: '0',
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
                        paddingHorizontal: '16px',
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
                                backgroundColor: appConfig.theme.colors.light['gray4'],
                                marginRight: '8px',
                                color: appConfig.theme.colors.light['black'],
                            }}
                        />
                        <ButtonSendSticker 
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker: ' + sticker );

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
                                paddingHorizontal: '25px'
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {

    const router = useRouter();
    const loggedUsername = router.query.username;


    return (
        <>
            <Box styleSheet={{ 
                    width: '100%', 
                    padding: '8px',
                    margin: '0', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start' }} >
                
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    iconName="FaArrowLeft" 
                    rounded="full"
                    href='../'
                    styleSheet={{
                        color: appConfig.theme.colors.light['black'],
                        marginRight: '8px'
                    }}
                />
                <Image
                                    styleSheet={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${loggedUsername}.png`}
                        />
                <Text variant='heading5'>
                    {loggedUsername}
                </Text>
            </Box>
        </>
    )
}

function MessageList(props) {
    const router = useRouter();
    const { username } = router.query;

    async function handleDeleteMessage(msgId,msgUsr){
        if(username == msgUsr){
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
    }}

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.light['gray1'],
                marginBottom: '8px',
            }}
        >
            {props.mensagens.map((chatmsg) => {  
            const isSameUser = username === chatmsg.usr
            const momentDateTime = moment()
            
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
                                   
                                   <Moment format='DD/MM/YY HH:mm'>{chatmsg.created_at}</Moment>                          
                                </Text>
                            </Box>
                            {/* Delete Message Button */}
                            { isSameUser &&
                            <Box>
                                <Button
                                    iconName="FaTimes"
                                    variant="tertiary"
                                    colorVariant='neutral'
                                
                                    onClick={() => handleDeleteMessage(chatmsg.id,chatmsg.usr)}
                                />
                            </Box>}
                        </Box>
                        {chatmsg.text.startsWith(':sticker:')
                            ? (
                                <Image 
                                    src={chatmsg.text.replace(':sticker:','')} 
                                    width='35%'
                                />
                            )
                            : ( 
                                chatmsg.text
                            )}
                       
                    </Text>
                );
            })}
        </Box>
    )
}

import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';


function Title(props){
    const Tag = props.tag || 'h1';
    return(
        <>
            <Tag>{props.children}</Tag>

            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.light['gray1']};
                font-size:24px;
                font-weight:600;
            }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [profilePicture, setProfilePicture] = React.useState('https://dummyimage.com/640/E7E7E7/222222.png&text=??');

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'left',
            backgroundImage: 'url(https://kauelima.com/img/stones.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', 
              maxWidth: {
                xs: '100%', 
                md: '90%', 
                lg: '80%', 
              },
              height: "100%",
              padding: '32px', margin: 0,
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.light['gray4'],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (eventInfo){
                eventInfo.preventDefault();
                roteamento.push(`/chat?username=${username}`);
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '80%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{color: appConfig.theme.colors.light['gray1'] }}>
                {appConfig.name}
              </Text>
                <Image
                styleSheet={{
                  borderRadius: '50%',
                  height: '100px',
                  margin: '20px 0',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: appConfig.theme.colors.light['gray3'],
                  backgroundColor: appConfig.theme.colors.light['gray3'],
                }}
                src={profilePicture}
                onError = {function(event) {
                  setProfilePicture(`https://dummyimage.com/640/E7E7E7/222222.png&text=??`)
              }}
              />
              <TextField
                value={username}
                placeholder="Digite seu usuário do Github"
                onChange={function (event){
                  const valor = event.target.value
                  setProfilePicture(`https://github.com/${valor}.png`)
                  setUsername(valor.toLowerCase())
                }} 

                fullWidth
                hasLabel={false}
                rounded="full"
                size="sm"
                variant="basicBordered"
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.light['gray1'],
                    mainColor: appConfig.theme.colors.light['gray2'],
                    mainColorHighlight: appConfig.theme.colors.light['primary'],
                    backgroundColor: appConfig.theme.colors.light['gray4'],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.light['primaryOverlay'],
                  mainColor: appConfig.theme.colors.light['primary'],
                  mainColorLight: appConfig.theme.colors.light['secondary'],
                  mainColorStrong: appConfig.theme.colors.light['primary'],
                }}
                rounded="full"
                size="xl"
              />
            </Box>
            {/* Formulário */}
          </Box>
        </Box>
      </>
    );
  }
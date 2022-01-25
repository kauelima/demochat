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
                color: ${appConfig.theme.colors.neutrals['200']};
                font-size:24px;
                font-weight:600;
            }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('kauelima');
    const roteamento = useRouter();

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
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (eventInfo){
                eventInfo.preventDefault();
                roteamento.push("/chat")
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">Boas vindas de volta!</Title>
              <Text variant="body3" styleSheet={{color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
                <Image
                styleSheet={{
                  borderRadius: '50%',
                  height: '100px',
                  margin: '20px 0',
                }}
                src={`https://github.com/${username}.png`}
              />
              <TextField 
                  value={username}
                  onChange={function (event){
                    const valor = event.target.value
                    setUsername(valor)
                  }} 
                  fullWidth
                  textFieldColors={{
                    neutral: {
                      textColor: appConfig.theme.colors.neutrals[200],
                      mainColor: appConfig.theme.colors.neutrals[900],
                      mainColorHighlight: appConfig.theme.colors.primary[500],
                      backgroundColor: appConfig.theme.colors.neutrals[800],
                    },
                  }}
                />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
          </Box>
        </Box>
      </>
    );
  }
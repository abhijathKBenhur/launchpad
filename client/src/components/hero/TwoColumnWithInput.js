import React,{useState} from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Header from "../headers/light.js";
import axios from 'axios'
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

import { ReactComponent as InstagramIcon } from "feather-icons/dist/icons/instagram.svg";
import { ReactComponent as TwitterIcon } from "feather-icons/dist/icons/twitter.svg";
import { ReactComponent as LinkedinIcon } from "feather-icons/dist/icons/linkedin.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-start`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
  svg {
    ${tw`mr-5 mt-5`}
  }
`;

export default ({ roundedHeaderButton }) => {
  const api = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? "/api": "http://localhost:4000/api"
})
  const [searchText, setSearchText] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedList, setSubscribedList] = useState(0);
  const [errorMailId, setErrorMail] = useState(false);

  const submitMailId = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(searchText).toLowerCase())){
      setErrorMail(true)
    }else{
      setErrorMail(false)
      api.post(`/subscribe`,{
        mailID: searchText,
      }).then((success) => {
        // reactGA.event({
        //   category:'Button',
        //   action:"SUBSCRIBED",
        //   label:"Subscribed for mail",
        //   value: searchText
        // })
        setSubscribed(true);
        api.post(`/sendMail`,{mailID:searchText}).then(succes =>{
          console.log(success)
        }).catch(err =>{
          console.error(err)
        })
      });
    }
    
  };
  const type = (event) => {
    if (event) setSearchText(event.target.value);
  };
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn style={{gap:30}}>
          <LeftColumn>
            <Heading>
              All your best ideas <br/> <span tw="text-primary-500">On the Blockchain.</span> Forever.
            </Heading>
            <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Paragraph>
            <Actions>
              <input type="text" onKeyUp={type} placeholder="Your E-mail Address" />
              <button onClick={() => submitMailId()}>Get Started</button>
            </Actions>
            <CustomersLogoStrip>
              <p>Get to us</p>
              <InstagramIcon style={{display:"inline"}}/>
              <TwitterIcon style={{display:"inline"}}/>
              <LinkedinIcon style={{display:"inline"}}/>
            </CustomersLogoStrip>
          </LeftColumn>
          <RightColumn>
            <Paragraph style={{marginTop:0}}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy
            </Paragraph>
            <Paragraph>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia
            </Paragraph>
            <Paragraph>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
            like Aldus PageMaker including versions of Lorem Ipsum.
            </Paragraph>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};

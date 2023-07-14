import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import  SwicthTabs  from '../../../components/switchTabs/SwicthTabs'
import useFetch from '../../../hooks/useFetch';
import { Carousel} from '../../../components/carousel/Carousel';

const Popular = () => {

    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

  return (
    <div className='carouselSection'>
    <ContentWrapper>
        <span className='carouselTitle'>Top Rated</span>
        <SwicthTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
    </ContentWrapper>

    <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    
    </div>
  )
}

export default Popular
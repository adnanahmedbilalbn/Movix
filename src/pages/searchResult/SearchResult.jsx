import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import InfiniteScroll from 'react-infinite-scroll-component'
import "./style.scss"
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import noResults from "../../assets/no-results.png"
import MovieCard from '../../components/movieCard/MovieCard'

const SearchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum, setpageNum] = useState(1);
  const [loading, setloading] = useState(null);
  const {query} = useParams();

  const fetchInitialData = () =>{
    setloading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setpageNum((prev) => prev +1);
      setloading(false)
    })
  }
  
  useEffect(() => {
    setpageNum(1)
    fetchInitialData();
  },[query])

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
    .then((res) => {
      if(data.results){
        setData({
          ...data,results: [...data.results, ...res.results]
        })
      }
      else{
        setData(res)
      }
      setpageNum((prev) => prev +1);
    })
  }
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading &&  (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className='pageTitle'>
                {`Search ${
                  data.total_results > 1
                  ?"results"
                  :"result"
                } of '${query}'`}

              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data.totalPages}
                loader={<Spinner />}
                >
                {data.results.map((item, index) => {
                  if(item.media_type === "person") return;
                  return(
                    <MovieCard key={index} data={item} fromSearch={true}/>
                  )
                })}
              </InfiniteScroll>
            </>            
          ): (
            <span className='resultNotFound'>
              Sorry, Results not Found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
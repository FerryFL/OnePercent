const ReviewAll = ({review}) =>{
    
    return(
        <div className="flex flex-col flex-wrap w-5/12 md:w-3/12 lg:w-2/12 h-min-20 bg-[#022B3A] text-[#E1E5F2] p-5 m-3">
            <p className="text-base font-bold md:text-xl md:font-bold mb-2">~ {review.name}</p>
            <p className="text-base md:font-semibold">{review.desc}</p>
        </div>
    )
}

export default ReviewAll
import urlSchema from "../models/shortUrl.models.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  const newUrl = new urlSchema({
    full_url: longUrl,
    short_url: shortUrl,
  });
  if(userId){
    newUrl.user = userId 
  }
  await newUrl.save();
};

export const findUrlFromShortUrl = (id)=>
{
    return urlSchema.findOneAndUpdate({ short_url: id } , {$inc:{clicks:1}});
}

export const getCustomUrl = async (slug)=>
{
  return await urlSchema.findOne({short_url: slug})
}


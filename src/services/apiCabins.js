import supabase, {supabaseUrl} from "./supabase";

export async function getCabins(){
    let { data, error } = await supabase
  .from('cabins')
  .select('*')

  if (error) {
    console.log(error);
    throw new Error("Could not load the cabins.");
  }
  return data;
}

export async function createEditCabin(newCabin, id){
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from('cabins');
  if(!id){
    query = query.insert([{...newCabin, image: imagePath}])
  }
  else{
    query = query.update({...newCabin, image: imagePath})
    .eq('id', id)
  }
  
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Could not create this new cabin.");
  }

  if (hasImagePath) return data;
  const { error: imageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)
  
  if (imageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error("Cabin image could not be uploaded and the cabin was not created!")
}
return data;
}

export async function deleteCabin(id){
  const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error("Could not delete this cabin.");
  }
  return data;
}
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToBeEdited = {}, onCloseModal}) {
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();

  const {id: editCabinId, ...otherValuesToBeEdited} = cabinToBeEdited;
  const isThereCabinToBeEdited = Boolean(editCabinId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isThereCabinToBeEdited ? otherValuesToBeEdited : {}
  });
  const {errors} = formState;

const isWorking = isCreating || isEditing;

  function handleSubmitForm(data){
    const image = typeof(data.image) === 'string' ? data.image : data.image[0];

    if(isThereCabinToBeEdited) editCabin({newCabinData: {...data, image}, id: editCabinId},
    {
      onSuccess: (data)=> {
        reset();
        onCloseModal?.()
      }
    })
    else createCabin({...data, image: data.image[0]}, {
      onSuccess: (data) => {
        reset();
        onCloseModal?.();
      }
  });
  }
  function onError(errors){
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
      <Input disabled={isWorking} type="text" id="name" {...register("name", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
      <Input disabled={isWorking} type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity can not be less than 1"
          }
        })}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
      <Input disabled={isWorking} type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Price can't be less than 1 euro"
          }
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
      <Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (value) => Number(value) <= Number(getValues().regularPrice) || "Discount must be less than the regular price"
        })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
      <Textarea disabled={isWorking} type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Cabin photo">
      <FileInput disabled={isWorking} id="image" accept="image/*" {...register("image", {
          required: isThereCabinToBeEdited ? false : "This field is required"
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking} >{isThereCabinToBeEdited ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

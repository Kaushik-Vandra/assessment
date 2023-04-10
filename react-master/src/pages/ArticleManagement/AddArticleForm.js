import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { Input } from '../../components/common/FormField';
import { addArticle } from '../../Redux/ArticleSlice';


const schema = yup
  .object({
    picture: yup.mixed().test('required', 'Please select a file', value => {
      return value && value.length;
    }),
    title: yup.string().required(),
    content: yup.string().required(),
  })
  .required();

const AddArticleForm = () => {

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach(image => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs)
  }, [images]);

  const imageChangeHandler = (e) => {
    // console.log('e: ', e.target.files);
    setImages([...e.target.files])

  }

  const onSubmit = (data) => {
    // console.log("data: ", data);
    let formData = new FormData();
    formData.append('picture', data.picture[0]);
    formData.append('title', data.title);
    formData.append('content', data.content);
    
    dispatch(addArticle(formData))
    .then((res) => navigate("/article-management"));
  };

  return (
    <div>
        <div className="card m-auto w-75 my-5">
          <div className="card-body">
            <h3>Article Add Management</h3> <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label>Upload an Image</label> <br />
                {imageURLs.map(imgSrc => <img src={imgSrc} width="200" />)} <br /> <br />
                <input type="file" accept='image/*' {...register('picture')} onChange={imageChangeHandler} />
                {errors.picture && <p className="text-danger fw-light fst-italic">{errors.picture.message}</p> }
              </div>
              <div className="mb-4">
                <Input
                  label="Title"
                  register={register}
                  name="title"
                  type="text"
                  errors={errors}
                />
              </div>
              <div>
                <label className="form-label">Content</label>
                <textarea
                  {...register("content")}
                  placeholder="Content"
                  cols="20"
                  rows="5"
                  className="form-control"
                ></textarea>
                {errors.content && <p className="text-danger fw-light fst-italic">{errors.content.message}</p> }
              </div>{" "}
              <br />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default AddArticleForm
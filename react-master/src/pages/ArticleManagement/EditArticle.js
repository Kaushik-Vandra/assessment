import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/common/FormField";
import * as yup from "yup";
import { getArticleDetail, updateArticle } from "../../Redux/ArticleSlice";
import { IMAGE_BASE } from "../../constants";

const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
  })
  .required();

const EditArticle = () => {
  const params = useParams();

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const articleDetails = useSelector((state) => state.article.articleDetails);
  // console.log('articleDetails: ', articleDetails);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);

  useEffect(() => {
    let payload = {
      _id: params.id,
    };
    dispatch(getArticleDetail(payload)).then((res) => {
      const response = res.data;
      // console.log("response: ", response);
      setValue("title", response.title);
      setValue("content", response.content);
    });
  }, []);

  const imageChangeHandler = (e) => {
    // console.log('e: ', e.target.files);
    setImages([...e.target.files]);
  };

  const onSubmit = (data) => {
    // console.log("data: ", data);
    let formData = new FormData();
    formData.append("picture", data.picture[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("_id", params.id);

    dispatch(updateArticle(formData)).then((res) => {
      if (res.status === 200) {
        navigate("/article-management");
      }
    });
  };
  return (
    <div>
      <div className="card m-auto w-75 my-5">
        <div className="card-body">
          <h3>Article Edit Management</h3> <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label>Upload an Image</label> <br />
              {imageURLs.length < 1 ? (
                <img
                  src={`${IMAGE_BASE}/article/${articleDetails.image}`}
                  width="200"
                />
              ) : (
                ""
              )}
              {imageURLs.map((imgSrc) => (
                <img src={imgSrc} width="200" />
              ))}{" "}
              <br /> <br />
              <input
                type="file"
                accept="image/*"
                {...register("picture")}
                onChange={imageChangeHandler}
              />
              {errors.picture && (
                <p className="text-danger fw-light fst-italic">
                  {errors.picture.message}
                </p>
              )}
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
              {errors.content && (
                <p className="text-danger fw-light fst-italic">
                  {errors.content.message}
                </p>
              )}
            </div>{" "}
            <br />
            <button type="submit" className="btn btn-primary">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;

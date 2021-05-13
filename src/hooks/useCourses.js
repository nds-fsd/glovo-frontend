/* eslint-disable no-debugger */
import { useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { COURSE } from '../router/router';

export const useCourses = () => {
  const [courses, setCourses] = useState({ count: 0, list: [] });
  const [hasCourses, setHasCourses] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPages, setFilteredPages] = useState();
  const [filteredCourses, setFilteredCourses] = useState();

  const getCourses = ({ id, page, limit = 5 }) => {
    shortFetch({
      url: `${COURSE}/search?page=${page}&limit=${limit}`,
      method: 'POST',
      body: {
        Restaurant: id,
      },
      token: true,
      onSuccess: (payload) => {
        if (payload.count === 0) {
          setHasCourses(false);
          return;
        }
        setCourses(payload);
        setHasCourses(true);
        setTotalPages(Math.ceil(payload.count / limit));
      },
    });
  };
  const filterCourses = ({ id, pag, lim, search }) => {
    const body = { Restaurant: id };
    if (search) {
      body.name = search;
    }
    shortFetch({
      url: `${COURSE}/search?page=${pag}&limit=${lim}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        if (payload.count === 0) {
          setFilteredPages(1);
          setFilteredCourses(payload);
          setHasCourses(true);
          return;
        }
       
        setFilteredCourses(payload);
        setHasCourses(true);
        setFilteredPages(Math.ceil(payload.count / (lim || 1)));
      },
    });
  };
  const clearFilter = () => {
    setFilteredCourses(undefined);
    setFilteredPages(undefined);
  };

  const deleteCourses = ({ courseId, onSuccess }) => {
    shortFetch({
      url: `${COURSE}/deleteAll/${courseId}`,
      token: true,
      method: 'DELETE',
      onSuccess,
    });
  };

  const createCourse = ({ restaurantId, courseName, onSuccess }) => {
    const body = {
      Restaurant: restaurantId,
      name: courseName,
    };
    shortFetch({ url: `${COURSE}`, method: 'POST', token: true, body, onSuccess });
  };

  const editCourse = ({ courseName, courseId, onSuccess }) => {
    shortFetch({
      url: `${COURSE}/${courseId}`,
      method: 'PUT',
      token: true,
      body: { name: courseName },
      onSuccess,
    });
  };

  return {
    hasCourses,
    totalPages,
    courses,
    getCourses,
    filterCourses,
    clearFilter,
    filteredCourses,
    filteredPages,
    deleteCourses,
    createCourse,
    editCourse,
  };
};

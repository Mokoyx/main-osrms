import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import SubTitles from "../../components/SubTitles";

import {
  familyInputs,
  youthInputs,
  plannedGivingAndTrustServicesDisplayNames,
  plannedGivingAndTrustServicesSubCategory,
  plannedGivingAndTrustServicesInput,
  childrenInputs,
  childrenDisplayNames,
  healthInputs,
  healthDisplayNames,
  healthDisplayNamesSubCategory,
  womensInputs,
  stewardInputs,
  ministerialInputs,
  ministerialDisplayNames,
  ministerialSpousesAssociationInputs,
  communicationInputs,
  communicationInputsDisplayNames,
  educationInputs,
  educationInputsDisplayNames,
} from "../../data/formData";

const DepartmentForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object().shape({
    ...generateValidationSchema(familyInputs),
    ...generateValidationSchema(youthInputs),
    ...generateValidationSchema(plannedGivingAndTrustServicesInput),
    ...generateValidationSchema(childrenInputs),
    ...generateValidationSchema(healthInputs),
    ...generateValidationSchema(womensInputs),
    ...generateValidationSchema(ministerialSpousesAssociationInputs),
    ...generateValidationSchema(ministerialInputs),
    ...generateValidationSchema(communicationInputs),
    ...generateValidationSchema(educationInputs),
  });

  function generateValidationSchema(inputs) {
    const schema = {};
    inputs.forEach((input) => {
      schema[input.name] = yup
        .string()
        .matches(/^[0-9]*$/, {
          message: `${input.label} should contain only numbers`,
          excludeEmptyString: true,
        })
        .matches(/^[^+-]*$/, {
          message: `${input.label} cannot contain + or - characters`,
          excludeEmptyString: true,
        })
        .required(`${input.label} is required`);
    });
    return schema;
  }

  const initialValues = {
    ...generateInitialValues(familyInputs),
    ...generateInitialValues(youthInputs),
    ...generateInitialValues(plannedGivingAndTrustServicesInput),
    ...generateInitialValues(childrenInputs),
    ...generateInitialValues(healthInputs),
    ...generateInitialValues(womensInputs),
    ...generateInitialValues(ministerialSpousesAssociationInputs),
    ...generateInitialValues(ministerialInputs),
    ...generateInitialValues(communicationInputs),
    ...generateInitialValues(educationInputs),
  };

  function generateInitialValues(inputs) {
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = "";
    });
    return values;
  }

  return (
    <Box m="20px">
      <Header
        title="DEPARTMENT FORM"
        subtitle="Create a New Department Profile"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="1fr">
              {/************************************************************************************************************/}
              {/****************************************FAMILY'S DEPARTMENT*************************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Family's Department" />

                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(3, 1fr)"
                >
                  {familyInputs.map((input, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      variant="filled"
                      label={input.label}
                      name={input.name}
                      value={values[input.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[input.name] && !!errors[input.name]}
                      helperText={touched[input.name] && errors[input.name]}
                    />
                  ))}
                </Box>
              </Box>

              {/************************************************************************************************************/}
              {/*******************************************YOUTH DEPARTMENT*************************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Youth Department" />

                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(3, 1fr)"
                >
                  {youthInputs.map((input, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      variant="filled"
                      label={input.label}
                      name={input.name}
                      value={values[input.name]}
                      onChange={(event) => {
                        const regex = /^[0-9]*$/;
                        const inputValue = event.target.value;
                        if (
                          (regex.test(inputValue) || inputValue === "") &&
                          !inputValue.includes("-") &&
                          !inputValue.includes("+")
                        ) {
                          handleChange(event);
                        }
                      }}
                      onBlur={handleBlur}
                      error={touched[input.name] && !!errors[input.name]}
                      helperText={touched[input.name] && errors[input.name]}
                    />
                  ))}
                </Box>
              </Box>

              {/************************************************************************************************************/}
              {/*************************************PLANNED GIVING AND TRUST SERVICES**************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Planned Giving And Trust Services" />

                {Array.from(
                  new Set(
                    plannedGivingAndTrustServicesInput.map((input) => input.id)
                  )
                ).map((categoryId) => (
                  <Box key={categoryId}>
                    <SubTitles
                      subtitleCategory={
                        plannedGivingAndTrustServicesDisplayNames[categoryId] ||
                        categoryId
                      }
                      subCategory={
                        plannedGivingAndTrustServicesSubCategory[categoryId] ||
                        ""
                      }
                    />

                    <Box display="flex" flexWrap="wrap">
                      {plannedGivingAndTrustServicesInput
                        .filter((input) => input.id === categoryId)
                        .map((input, index) => (
                          <Box key={index} width="calc(100% / 3)" p={1}>
                            {" "}
                            <TextField
                              fullWidth
                              variant="filled"
                              label={input.label}
                              name={input.name}
                              value={values[input.name]}
                              onChange={(event) => {
                                const regex = /^[0-9]*$/;
                                const inputValue = event.target.value;
                                if (
                                  (regex.test(inputValue) ||
                                    inputValue === "") &&
                                  !inputValue.includes("-") &&
                                  !inputValue.includes("+")
                                ) {
                                  handleChange(event);
                                }
                              }}
                              onBlur={handleBlur}
                              error={
                                touched[input.name] && !!errors[input.name]
                              }
                              helperText={
                                touched[input.name] && errors[input.name]
                              }
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/************************************************************************************************************/}
              {/****************************************CHILDREN'S DEPARTMENT***********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Children's Department" />

                {Array.from(
                  new Set(childrenInputs.map((input) => input.id))
                ).map((categoryId) => (
                  <Box key={categoryId}>
                    <SubTitles
                      subtitleCategory={
                        childrenDisplayNames[categoryId] || categoryId
                      }
                    />

                    <Box display="flex" flexWrap="wrap">
                      {childrenInputs
                        .filter((input) => input.id === categoryId)
                        .map((input, index) => (
                          <Box key={index} width="calc(100% / 3)" p={1}>
                            {" "}
                            <TextField
                              fullWidth
                              variant="filled"
                              label={input.label}
                              name={input.name}
                              value={values[input.name]}
                              onChange={(event) => {
                                const regex = /^[0-9]*$/;
                                const inputValue = event.target.value;
                                if (
                                  (regex.test(inputValue) ||
                                    inputValue === "") &&
                                  !inputValue.includes("-") &&
                                  !inputValue.includes("+")
                                ) {
                                  handleChange(event);
                                }
                              }}
                              onBlur={handleBlur}
                              error={
                                touched[input.name] && !!errors[input.name]
                              }
                              helperText={
                                touched[input.name] && errors[input.name]
                              }
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/************************************************************************************************************/}
              {/******************************************HEALTH'S DEPARTMENT***********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Health's Department" />

                {Array.from(new Set(healthInputs.map((input) => input.id))).map(
                  (categoryId) => (
                    <Box key={categoryId}>
                      <SubTitles
                        subtitleCategory={
                          healthDisplayNames[categoryId] || categoryId
                        }
                        subCategory={
                          healthDisplayNamesSubCategory[categoryId] || " "
                        }
                      />

                      <Box display="flex" flexWrap="wrap">
                        {healthInputs
                          .filter((input) => input.id === categoryId)
                          .map((input, index) => (
                            <Box key={index} width="calc(100% / 3)" p={1}>
                              {" "}
                              <TextField
                                fullWidth
                                variant="filled"
                                label={input.label}
                                name={input.name}
                                value={values[input.name]}
                                onChange={(event) => {
                                  const regex = /^[0-9]*$/;
                                  const inputValue = event.target.value;
                                  if (
                                    (regex.test(inputValue) ||
                                      inputValue === "") &&
                                    !inputValue.includes("-") &&
                                    !inputValue.includes("+")
                                  ) {
                                    handleChange(event);
                                  }
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched[input.name] && !!errors[input.name]
                                }
                                helperText={
                                  touched[input.name] && errors[input.name]
                                }
                              />
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  )
                )}
              </Box>

              {/************************************************************************************************************/}
              {/******************************************WOMENS'S DEPARTMENT***********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Women's Department" />

                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(3, 1fr)"
                >
                  {womensInputs.map((input, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      variant="filled"
                      label={input.label}
                      name={input.name}
                      value={values[input.name]}
                      onChange={(event) => {
                        const regex = /^[0-9]*$/;
                        const inputValue = event.target.value;
                        if (
                          (regex.test(inputValue) || inputValue === "") &&
                          !inputValue.includes("-") &&
                          !inputValue.includes("+")
                        ) {
                          handleChange(event);
                        }
                      }}
                      onBlur={handleBlur}
                      error={touched[input.name] && !!errors[input.name]}
                      helperText={touched[input.name] && errors[input.name]}
                    />
                  ))}
                </Box>
              </Box>

              {/************************************************************************************************************/}
              {/****************************************STEWARDSHIP'S DEPARTMENT********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Stewardship's Department" />

                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(3, 1fr)"
                >
                  {stewardInputs.map((input, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      variant="filled"
                      label={input.label}
                      name={input.name}
                      value={values[input.name]}
                      onChange={(event) => {
                        const regex = /^[0-9]*$/;
                        const inputValue = event.target.value;
                        if (
                          (regex.test(inputValue) || inputValue === "") &&
                          !inputValue.includes("-") &&
                          !inputValue.includes("+")
                        ) {
                          handleChange(event);
                        }
                      }}
                      onBlur={handleBlur}
                      error={touched[input.name] && !!errors[input.name]}
                      helperText={touched[input.name] && errors[input.name]}
                    />
                  ))}
                </Box>
              </Box>

              {/************************************************************************************************************/}
              {/**************************************MINISTERIAL SPOUSES ASSOCIATION***************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Ministerial Spouses Association" />

                <Box
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(3, 1fr)"
                >
                  {ministerialSpousesAssociationInputs.map((input, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      variant="filled"
                      label={input.label}
                      name={input.name}
                      value={values[input.name]}
                      onChange={(event) => {
                        const regex = /^[0-9]*$/;
                        const inputValue = event.target.value;
                        if (
                          (regex.test(inputValue) || inputValue === "") &&
                          !inputValue.includes("-") &&
                          !inputValue.includes("+")
                        ) {
                          handleChange(event);
                        }
                      }}
                      onBlur={handleBlur}
                      error={touched[input.name] && !!errors[input.name]}
                      helperText={touched[input.name] && errors[input.name]}
                    />
                  ))}
                </Box>
              </Box>

              {/************************************************************************************************************/}
              {/****************************************MINISTERIAL DEPARTMENT**********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Ministerial Department" />

                {Array.from(
                  new Set(ministerialInputs.map((input) => input.id))
                ).map((categoryId) => (
                  <Box key={categoryId}>
                    <SubTitles
                      subtitleCategory={
                        ministerialDisplayNames[categoryId] || categoryId
                      }
                    />

                    <Box display="flex" flexWrap="wrap">
                      {ministerialInputs
                        .filter((input) => input.id === categoryId)
                        .map((input, index) => (
                          <Box key={index} width="calc(100% / 3)" p={1}>
                            {" "}
                            <TextField
                              fullWidth
                              variant="filled"
                              label={input.label}
                              name={input.name}
                              value={values[input.name]}
                              onChange={(event) => {
                                const regex = /^[0-9]*$/;
                                const inputValue = event.target.value;
                                if (
                                  (regex.test(inputValue) ||
                                    inputValue === "") &&
                                  !inputValue.includes("-") &&
                                  !inputValue.includes("+")
                                ) {
                                  handleChange(event);
                                }
                              }}
                              onBlur={handleBlur}
                              error={
                                touched[input.name] && !!errors[input.name]
                              }
                              helperText={
                                touched[input.name] && errors[input.name]
                              }
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/************************************************************************************************************/}
              {/****************************************COMMUNICATION DEPARTMENT**********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Communication Department" />

                {Array.from(
                  new Set(communicationInputs.map((input) => input.id))
                ).map((categoryId) => (
                  <Box key={categoryId}>
                    <SubTitles
                      subtitleCategory={
                        communicationInputsDisplayNames[categoryId] ||
                        categoryId
                      }
                    />

                    <Box display="flex" flexWrap="wrap">
                      {communicationInputs
                        .filter((input) => input.id === categoryId)
                        .map((input, index) => (
                          <Box key={index} width="calc(100% / 3)" p={1}>
                            {" "}
                            <TextField
                              fullWidth
                              variant="filled"
                              label={input.label}
                              name={input.name}
                              value={values[input.name]}
                              onChange={(event) => {
                                const regex = /^[0-9]*$/;
                                const inputValue = event.target.value;
                                if (
                                  (regex.test(inputValue) ||
                                    inputValue === "") &&
                                  !inputValue.includes("-") &&
                                  !inputValue.includes("+")
                                ) {
                                  handleChange(event);
                                }
                              }}
                              onBlur={handleBlur}
                              error={
                                touched[input.name] && !!errors[input.name]
                              }
                              helperText={
                                touched[input.name] && errors[input.name]
                              }
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/************************************************************************************************************/}
              {/****************************************EDUCATION DEPARTMENT**********************************************/}
              {/************************************************************************************************************/}

              <Box>
                <SubTitles titleCategory="Education Department" />

                {Array.from(
                  new Set(educationInputs.map((input) => input.id))
                ).map((categoryId) => (
                  <Box key={categoryId}>
                    <SubTitles
                      subtitleCategory={
                        educationInputsDisplayNames[categoryId] || categoryId
                      }
                    />

                    <Box display="flex" flexWrap="wrap">
                      {educationInputs
                        .filter((input) => input.id === categoryId)
                        .map((input, index) => (
                          <Box key={index} width="calc(100% / 3)" p={1}>
                            {" "}
                            <TextField
                              fullWidth
                              variant="filled"
                              label={input.label}
                              name={input.name}
                              value={values[input.name]}
                              onChange={(event) => {
                                const regex = /^[0-9]*$/;
                                const inputValue = event.target.value;
                                if (
                                  (regex.test(inputValue) ||
                                    inputValue === "") &&
                                  !inputValue.includes("-") &&
                                  !inputValue.includes("+")
                                ) {
                                  handleChange(event);
                                }
                              }}
                              onBlur={handleBlur}
                              error={
                                touched[input.name] && !!errors[input.name]
                              }
                              helperText={
                                touched[input.name] && errors[input.name]
                              }
                            />
                          </Box>
                        ))}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/************************************************************************************************************/}
              {/***********************************DEFAULT PAGINATION AND SUBMISSION****************************************/}
              {/************************************************************************************************************/}

              <Box
                display="flex"
                justifyContent="end"
                mt="5px"
                mb="30px"
                mr="80px"
              >
                <Button type="submit" color="secondary" variant="contained">
                  Submit Report
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DepartmentForm;

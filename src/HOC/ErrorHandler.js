import { Component } from "react";

const ErrorHandler = (SimpleComponent) => {
    return class extends Component {
       constructor() {
         super();
         this.state = {
           error: {},
         };
       }
   
        errorHandlerInBulk = (errorObjectList) => {
         let { error } = { ...this.state };
   
         (errorObjectList || []).map((object) => {
           if (object.errorMessage === '') {
             delete error[object.key];
           } else {
             error = {
               ...error,
               [object.key]: object.errorMessage,
             };
           }
           return object;
         });
         this.setState(() => ({
           error: error,
         }));
   
       };
   
        errorHandler = (errorMessage, key) => {
         let {error} = { ...this.state };
         if (errorMessage === '') {
           delete error[key];
         } else {
           error = {
             ...error,
             [key]: errorMessage,
           };
         }
         this.setState(() => ({
           error: error,
         }));
       };
   
       render() {
         return (
           <SimpleComponent
             {...this.props}
             errors={this.state.error}
             errorHandler={this.errorHandler}
             errorHandlerInBulk={this.errorHandlerInBulk}
           />
         );
       }
     };
   }
   
   export default ErrorHandler;
   
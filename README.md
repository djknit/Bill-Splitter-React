# Deluxe Bill Splitter

### This app aims to be an easy tool to split any bill or group of bills any way between any number of people.

## Contents
* [Links](#links)
* [Note](#note)
* [Inspiration](#inspiration)
* [Project Goals](#project-goals)
* [Action Plan](#action-plan)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* GitHub repository: [github.com/djknit/Bill-Splitter-React](https://github.com/djknit/Bill-Splitter-React)

## Note
I began developing this project using AngularJS. I started this repository to create a React version of the project.
The original repository with the AngularJS version can be found at [github.com/djknit/Delux-Bill-Splitter](https://github.com/djknit/Delux-Bill-Splitter).

## Inspiration
This app was inspired by the following problem that I encountered a few years ago. I was living in a rental house with four other people. I had two bills in my name, two of my roommates had bills in their names, and the rent had to be paid with one check. We were all splitting the bills and rent so we could have split each bill individually and split the rent when it was due, but that was going to involve a large number of payments between us. Additionally, some of those payments would involve one person paying another person only to have the second person end up having to pay the money back to the first person. I thought that there must be a way to minimize the number of payments that each person has to make. I was able to use basic algebra to develop a system for adding all of the bills and rent together each month and figuring out what each person owed or was owed. With this method, each person only needed to make one payment for the month which would be distributed as necessary so that everybody came out even. That is the situation that inspired me to create this app, but since I am making the app, I decided that I would like to try to make it as useful as possible with the goal of covering any possible bill splitting situation.

## Project Goals
* This app aims to be an easy tool to split any bill or group of bills any way between any number of people.
* Modularize code as much as is practical.
* Minimum Viable Product should include:
  * Ability to create new bill list with participants identified by name.
  * Ability to add any number of bills to each list, each of which should collect the following information.
    * Name of bill (required)
    * $ Amount of bill (required)
    * Is the bill paid?
      * If so, who (which participant) paid for it? Should allow for multiple people to have paid.
    * Who is responsible for the cost of the bill? Allow splitting of responsibility as follows:
      * Evenly amongst all participants
      * Evenly amongst some participants
      * Enter dollar amount owed by each participant
      * By percent owed by each participant
      * Require responsibility for full bill amount to be accounted for exactly before saving. (i.e. Sum of amounts owed by all participants should equal bill total.)
  * After user finishes entering info for whole list, display total owed by (or owed to) each participant. If some or all bills have not been paid, also display total owed to each biller.
* In addition to Minimum Viable Product, also include:
  * Account setup and user authentication
  * Allow participants in lists to be identified by name or account reference.
  * Allow user to save lists (also allowing ongoing lists)
  * In addition to bills, users may enter payments made between participants or to billers as transactions in the list.
  * When entering how to split responsiblity for bill,
    * Allow even splitting of remaining portion at any time.
    * Allow user to set default splitting (evenly or by percent) for entire list.

## Action Plan

##### In Progress:
* [ ] Recreate with React the [current version](https://github.com/djknit/Delux-Bill-Splitter) of the app which was built using AngularJS.

I am working to develop the basic functions on the front-end only. During this process, I will keep in mind that I plan to create a back-end and attempt to organize the data in a way that will make it easy to transfer state between the front and back ends.

I am working on the "Enter Bills" page which is where the most important logic necessary for the MVP is contained.

* [x] Create basic layout of page
* [x] Create functionality to add and remove participants from the list.
* [ ] Create functionality to add bill to list
  * [x] Create form (in modal)
  * [x] Bill Name section (design and implement with logic including updating state)
  * [x] Bill Total section
  * [x] Billers section
  * [x] Responsible participants section
  * [x] isPaid/paidBy section
  * [ ] Create submit function for new-bill-form to validate form and add bill to list or highlight input problems.
* [ ] Create remove bill functionality
* [ ] Add logic to calculate bills
* [ ] Design results display

Try to fix the following bugs:

* [x] `alert.css` appears to not be working

Consider the following possible improvements:

* [ ] Establish a central store of state on the front end.
  * This should cut down on the amount of data that needs to be passed between components with props.
  * It should also make it easier to connect with API once back end is added.
* [ ] Look for ways to remove repetition in form by creating more components and/or reorganizing components
* [ ] Improve UX of Add Bill form.
  * [ ] Disable "Biller", "Responsible Participants", and "Has this bill been paid?" sections until Bill Total has been set.
  * [ ] Consider breaking form in to pieces which would be displayed one at a time in the modal with butttons to move forwards and backwards through the steps.
  * [ ] Add helper text by fields to explain problems.
  * [ ] Consider adding more instructions/helper text, possibly using Bootstrap tooltips.

Once the above steps are complete, I will begin work on the back-end.

## Project Features
(Coming soon...)

## Technologies Used
#### Front End
* AngularJS
* Bootstrap
* Node
* Other Node packages:
  * angular-seed

## Instructions for Use
(Coming soon...)

## Developer
This project is developed and maintained by David Knittel. Any and all questions, comments, suggestions, and/or proposed contributions are welcome.
* Email: [djknit@gmail.com](mailto:djknit@gmail.com)
* Portfolio: [djknit.github.io](https://djknit.github.io/)
* GitHub: [github.com/djknit](https://github.com/djknit)
* LinkedIn: [linkedin.com/in/djknit](https://www.linkedin.com/in/djknit/)
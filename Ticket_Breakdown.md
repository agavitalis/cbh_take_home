# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Basic Assumptions:
I will assume that the following properties exist in the following tables:

#### Facilities table:
 - id
 - name

#### Agents table:
- id
- name

#### Shift table:
- id
- name
- start_time
- end_time
- agent_id
- facility_id

Now to implement this requirement, I need to create a lookup table to map facilities and agents since an agent can have different custom Ids(usernames) across the different facilities. For this, we need a joining table in this format:

#### FacilityAgentLookUp table
- id
- facility_id
- agent_id
- agent_custom_facility_id


### Task Breakdown
In order to implement this needed functionality, the tasks will be broken down as follows:

- Task 1: Create a `FacilityAgentLookUp` table as described above:
    * Create a migration file for FacilityAgentLookUp
    * Create a class for FacilityAgentLookUp and the necessary relationships with agents and facilities

        - ##### Time/effort estimates:
        * 1 hour

        - ##### Acceptance criteria: 
            * Ensure that the migration scripts run successfully
            * Ensure that relationships exists between FacilityAgentLookUp, Agent and Facilities
        

- Task 2: Create CRUD functionalities for FacilityAgentLookUp. Duplicates must be avoided.
    * Create a record for the facility, agent and agent's facility custom Id
    * Read a record for the facility, agent and agent's facility custom Id
    * Update a record for the facility, agent and agent's facility custom Id
    * Delete a record for the facility, agent and agent's facility custom Id

        - ##### Time/effort estimates:
            * 3 hours

        - ##### Acceptance criteria: 
            * Ensure a facility can add custom Id to an agent
            * Ensure a facility can read custom Id of an agent
            * Ensure a facility can edit custom Id to an agent
            * Ensure a facility can delete custom Id to an agent
            * Ensure a facility cannot add duplicate custom Id for an agent
             

- Task 3: Create a search functionality to enable search by agent's facility custom Id

    - ##### Time/effort estimates:
        * 2 hours

    - ##### Acceptance criteria: 
        * Ensure a facility can seach for an agent using custom agent Id
        

- Task 4: Update the `generateReport` function to add the agent's facility custom Id during report generation. This can be achieved by performing a left join between the `Shift` table and the `FacilityAgentLookUp` table on the facility_id and agent_id. For agents without custom facility Ids, we will default to displaying of the default agent Id.

    * ##### Time/effort estimates:
        * 2 hours

    - ##### Acceptance criteria: 
        * Ensure a facility can generate report successfully, and see the agent custom Ids.
        * For agent without custom Ids yet, ensure the agent database Id is displayed instead.






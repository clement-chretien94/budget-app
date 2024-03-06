// This file contains placeholder data that you'll be replacing for production version
const users = [
    {
        id: 'de659c8b-af60-4cde-9099-b846388a9762',
        name: 'User',
        email: 'user@clementchretien.com',
        password: 'Azerty123',
        currency: 'EUR'
    }
];

const budgets = [
    {
        id: '269ed560-0149-4e86-9d00-92c186b607ab',
        start_on: '02/2024',
        stable_income: '2000.00',
        user_id: 'de659c8b-af60-4cde-9099-b846388a9762'
    },
    {
        id: '3750ec87-87ef-4ecd-8378-a7d229be7b04',
        start_on: '03/2024',
        stable_income: '1766.92',
        user_id: 'de659c8b-af60-4cde-9099-b846388a9762'
    }
];

const categories = [
    {
        id: 'd378f097-6e47-4748-abbe-2915dfd7ad3f',
        name: 'Food',
        emoji: '🍟',
        color: '#1661E3',
        budget_id: '269ed560-0149-4e86-9d00-92c186b607ab'
    },
    {
        id: 'c3797380-c9fc-4743-a73f-fb3093606d74',
        name: 'Subscription',
        emoji: '🌐',
        color: '#16E326',
        budget_id: '269ed560-0149-4e86-9d00-92c186b607ab'
    },
    {
        id: '5ea2cdd4-03e8-45a5-9de7-d14269485545',
        name: 'Hobbies',
        emoji: '🎮',
        color: '#EA4E0A',
        budget_id: '3750ec87-87ef-4ecd-8378-a7d229be7b04'
    }
];

const transactions = [
    {
        id: '861731f0-ee42-4dd1-bd85-ac5369fdcdf4',
        type: 'out',
        description: 'Macdo order',
        amount: '22.57',
        created_at: '1707824788',
        category_id: 'd378f097-6e47-4748-abbe-2915dfd7ad3f'
    },
    {
        id: 'ed77a9d2-654f-4283-bcc4-5832b4c3f42f',
        type: 'out',
        description: 'Canteen refill',
        amount: '15.00',
        created_at: '1708862863',
        category_id: 'd378f097-6e47-4748-abbe-2915dfd7ad3f'
    },
    {
        id: '85f6dabc-ac17-418a-a4ae-22e9790c3172',
        type: 'out',
        description: 'Netflix subscription',
        amount: '23.73',
        created_at: '1707211729',
        category_id: 'c3797380-c9fc-4743-a73f-fb3093606d74'
    }
];

const goals = [
    {
        id: '05f94aef-3adc-4e2f-a954-83993456fc0b',
        name: 'Projet Japon',
        description: 'Planning a trip to Japan to visit Tokyo and the surrounding area.',
        emoji: '🗻',
        deadline_on: '15/07/2027',
        target: '15000.00',
        user_id: 'de659c8b-af60-4cde-9099-b846388a9762'
    }
];

const goalsTransactions = [
    {
        id: '861731f0-ee42-4dd1-bd85-ac5369fdcdf4',
        type: 'in',
        description: 'Savings February 2024',
        amount: '237.52',
        created_at: '1708885255',
        goal_id: '05f94aef-3adc-4e2f-a954-83993456fc0b'
    },
    {
        id: '87e4aafe-ae76-45df-94ea-61c98cf359f2',
        type: 'out',
        description: 'Office replacement',
        amount: '150.95',
        created_at: '1710671925',
        goal_id: '05f94aef-3adc-4e2f-a954-83993456fc0b'
    }
];

module.exports = {
    users,
    budgets,
    categories,
    transactions,
    goals,
    goalsTransactions
};
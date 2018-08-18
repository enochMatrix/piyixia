
import { TabNavigator, StackNavigator } from 'react-navigation';
import ChallengePage from './pages/ChallengePage/ChallengePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CreateComment from './pages/Common/Comment/CreateComment';
import CreateChallenge from './pages/ChallengePage/components/CreateChallenge';
import ChallengeDetailPage from './pages/ChallengePage/ChallengeDetailPage';
import StartPage from './pages/QuestionPage/StartPage';
import QuestionPage from './pages/QuestionPage/QuestionPage';
import ScoreBoard from './pages/QuestionPage/ScoreBoard';
import LoginPage from './pages/LoginPage/LoginPage';
import TikiPage from './pages/TikiPage/HomePage';
import Accept from './pages/ChallengePage/components/Accepted';

const stackRouter = StackNavigator({
    start: {
        screen: StartPage,
        navigationOptions: () => ({
            title: `智力问答`,
            headerStyle: { backgroundColor: 'white' },
            headerBackTitle: null
        }),
    },
    questionpage: {
        screen: QuestionPage,
        navigationOptions: () => ({
            title: '智力问答',
            headerStyle: { backgroundColor: 'white' },
            headerBackTitle: null
        }),
    },
    scoreboard: {
        screen: ScoreBoard,
        navigationOptions: () => ({
            title: '积分榜',
            headerStyle: { backgroundColor: 'white' },
            headerBackTitle: null
        }),
    },
});


const ChallengePageStack = StackNavigator({
    ProfilePage: {
        screen: ProfilePage,
        title: 'ProfilePage'
    },
    ChallengePage: {
        screen: ChallengePage,
    },
    CreateComment: {
        screen: CreateComment,
        navigationOptions: () => ({
            title: '新建回复',
            headerStyle: { backgroundColor: 'white' },
            headerBackTitle: null
        }),
    },
    CreateChallenge: {
        screen: CreateChallenge,
        navigationOptions: () => ({
            title: '新建挑战',
            headerStyle: { backgroundColor: 'white' },
            headerBackTitle: null
        }),
    },
    ChallengeDetailPage: {
        screen: ChallengeDetailPage,
        navigationOptions: () => ({
            title: '挑战内容',
            headerStyle: { backgroundColor: 'white' },
            headerBackTitle: null
        }),
    },

    AcceptPage: {
        screen: Accept
    }

});


const Router = TabNavigator(
    {
        // Router: Router,
        // HomePage: HomePage,
        TikiPage: {
            screen: TikiPage
        },
        QuestionPage: {
            screen: stackRouter
        },
        ChallengePageStack: ChallengePageStack,
        LoginPage: LoginPage
    },
    {
        initialRouteName: 'LoginPage',
        swipeEnabled: true,
        tabBarOptions: {
            tabBarVisible: false,
            style: {
                backgroundColor: 'transparent',
                position: 'absolute',
            }
        },
    },
);

export default Router;
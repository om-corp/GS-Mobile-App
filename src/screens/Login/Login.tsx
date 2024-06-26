import React, { useContext, useState } from "react"

/* NAVIGATION */
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "~/navigation"

/* COMPONENTS */
import { Alert, Modal, StyleSheet, Text, View } from "react-native"
import { colors, fontSize } from "~/lib/theme"
import Form from "~/components/form"
import ForgotPasswordModal from "./forgot-password"

/* DATA */
import { signInWithEmailAndPassword } from "firebase/auth"
import { UserContext } from "~/provider/user-provider"
import { auth } from "~/utils/firebase"
import handleFirebaseError from "~/lib/error-handler/firebase"

type NavigationProps = StackNavigationProp<RootStackParamList, 'Access'>

export default function Login() {
    const navigation = useNavigation<NavigationProps>()

    const { email, password, setEmail, setPassword, cleanUserInputs } = useContext(UserContext)

    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)

    const handleLogin = async (_email: string, _password: string) => {
        await signInWithEmailAndPassword(auth, _email, _password)
            .then(() => navigation.replace('App'))
            .catch(error => {
                return handleFirebaseError(error)
            })
    }

    return (
        <>
            <View style={styles.container}>
                <Form.Container>
                    <Form.Input icon={'mail'} label='Email' value={email} onChangeText={(value) => setEmail(value)} placeholder='Email' />
                    <Form.Input icon={'key'} label='Senha' value={password} onChangeText={(value) => setPassword(value)} placeholder='Password' secureTextEntry />

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: fontSize.sm, color: colors.border }} onPress={() => setShowForgotPasswordModal(true)}>
                            Esqueci minha senha
                        </Text>

                    </View>
                    <Form.Link label='Não possui uma conta?' text='Cadastre-se' onPress={() => navigation.replace('Cadastro')} />

                    <Form.Button title='Entrar' onPress={() => handleLogin(email, password)} />
                </Form.Container>
            </View>
            <Modal visible={showForgotPasswordModal} transparent>
                <View style={styles.modal}>
                    <ForgotPasswordModal setShowModal={setShowForgotPasswordModal} />
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flex: 1,
        justifyContent: 'center',
    }
})
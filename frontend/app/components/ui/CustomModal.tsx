import {
	Button,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'
import React, { FC, PropsWithChildren } from 'react'

interface Props {
	isOpen: boolean,
	onOpen: () => void
	onClose: () => void
	initialRef: React.RefObject<HTMLInputElement>
	finalRef: React.RefObject<HTMLInputElement>
	fun: () => void
	setValue: React.Dispatch<React.SetStateAction<any>>
}

const CustomModal: FC<PropsWithChildren<Props>> = ({
																										 children,
																										 onOpen,
																										 isOpen,
																										 onClose,
																										 initialRef,
																										 finalRef,
																										 fun,
																										 setValue
																									 }) => {

	return (
		<>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Задайте имя папки</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Input ref={initialRef} placeholder='Имя папки' onChange={(e) => setValue(e.target.value)} />
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={fun}>
							Создать
						</Button>
						<Button onClick={onClose}>Отмена</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CustomModal
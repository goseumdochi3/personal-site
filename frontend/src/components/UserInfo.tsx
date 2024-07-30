import { User } from '../models/User'

interface UserInfoProps {
  user: User
}

const UserInfo = (props: UserInfoProps) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.user.firstName} {props.user.lastName}
    </td>
  </tr>
)

export { UserInfo }
